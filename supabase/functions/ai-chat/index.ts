import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, hasImage } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Use gemini-2.5-flash for text, gemini-2.5-pro for images (better vision)
    const model = hasImage ? "google/gemini-2.5-pro" : "google/gemini-2.5-flash";

    const systemPrompt = `You are MicroMuse AI, a helpful and encouraging assistant for a skill-building and hobby platform called MicroMuse. 

Your role is to:
- Help users with their learning journey across various hobbies (Studies, Music, Art, Coding, Dance, Writing, Photography, Fitness, etc.)
- Provide tips, motivation, and guidance for completing challenges
- Answer questions about study techniques, creative skills, and personal development
- Analyze images if users share their work and provide constructive feedback
- Be friendly, encouraging, and supportive

Key facts about MicroMuse:
- Users complete daily 10-15 minute challenges based on their selected hobbies
- The platform tracks streaks and achievements
- Challenges are ONLY shown for hobbies the user has selected
- Categories include: Studies (Math, Science, Languages), Music, Art, Coding, Dance, Writing, Photography, Fitness, Gaming, Design, Cooking

When analyzing images:
- If it's artwork, provide constructive critique on composition, color, technique
- If it's code, help debug or suggest improvements
- If it's study material, help explain concepts
- Always be encouraging while offering helpful suggestions

Keep responses concise but helpful. Use emojis sparingly to add warmth.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please wait a moment and try again." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "Failed to get AI response" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("AI chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
