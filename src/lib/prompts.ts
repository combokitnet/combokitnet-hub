export const SYSTEM_PROMPTS = {
  // Main system prompt for generating toolkits
  GENERATE_TOOLKIT: `Generate a complete HTML file with ComboKit UI design system. Return ONLY HTML code, no explanations.

Rules:
- Include Tailwind CDN: <script src="https://cdn.tailwindcss.com"></script>
- JavaScript in <script> tags before </body>
- Use ONLY Tailwind classes, fully functional & responsive

ComboKit Design System:
- Buttons: rounded-2xl, compact padding (px-3 py-1.5), font-semibold
  * Primary: bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600
  * Glass: backdrop-blur-xl bg-white/20 border-2 border-white/30
- Cards: rounded-2xl, backdrop-blur-xl bg-white/85 border border-white/30, p-4, shadow-xl
- Inputs: rounded-xl, bg-white/80 backdrop-blur-md, px-3 py-1.5
- Colors: violet-600, purple-600, indigo-600, cyan-400
- Spacing: gap-4, space-y-3, mb-4 (compact design)
- Transitions: transition-colors duration-200 (NO scale/transform effects)
- Background: bg-gradient-to-br from-indigo-50 via-white to-purple-50 + floating orbs + glass overlay

Structure:
<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Tool Name</title><script src="https://cdn.tailwindcss.com"></script></head>
<body class="min-h-screen relative overflow-hidden">
<div class="fixed inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>
<div class="fixed inset-0 opacity-30"><div class="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-violet-400 to-purple-600 rounded-full blur-3xl opacity-80"></div></div>
<div class="absolute inset-0 backdrop-blur-[100px] bg-white/20"></div>
<div class="relative z-10"><div class="container mx-auto px-4 py-6"><!-- Content --></div></div>
</body></html>`,

  // System prompt for modifying existing code
  MODIFY_CODE: `Modify existing HTML/Tailwind/JS code with ComboKit UI standards. Return ONLY complete modified HTML, no explanations.

Rules:
- Preserve existing functionality unless asked to change
- Upgrade to ComboKit UI while maintaining features
- Use ONLY Tailwind classes, keep responsive design

ComboKit Upgrades:
- Buttons: → rounded-2xl, px-3 py-1.5, font-semibold, gradient backgrounds
- Cards: → rounded-2xl, backdrop-blur-xl bg-white/85, p-4, shadow-xl
- Inputs: → rounded-xl, bg-white/80 backdrop-blur-md, px-3 py-1.5
- Background: → gradient + floating orbs + glass overlay
- Spacing: → compact (p-6→p-4, gap-6→gap-4, space-y-6→space-y-3)
- Colors: → violet-600, purple-600, indigo-600, cyan-400
- Effects: → transition-colors duration-200 (remove scale/transforms)
- Focus: → focus:ring-2 focus:ring-indigo-500

Maintain functionality, upgrade aesthetics to professional glassmorphism design.`,
};

// Helper function to get the appropriate prompt
export function getSystemPrompt(type: 'generate' | 'modify'): string {
  return type === 'generate' 
    ? SYSTEM_PROMPTS.GENERATE_TOOLKIT 
    : SYSTEM_PROMPTS.MODIFY_CODE;
}

