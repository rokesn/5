# Solana Token Creator Design Guidelines

## Design Approach
**Utility-Focused Design System Approach** - This is a productivity tool where efficiency and functionality are paramount. Using a clean, minimal design system that prioritizes usability over visual flair.

**Reference**: Drawing inspiration from **Linear** and **Notion** for their clean, focused interfaces that handle complex workflows elegantly.

## Core Design Elements

### Color Palette
**Dark Mode Primary** (default):
- Background: `222 14% 9%` (deep charcoal)
- Surface: `222 11% 13%` (elevated cards/forms)
- Primary: `45 93% 58%` (Solana purple-inspired)
- Text Primary: `210 40% 95%` (near white)
- Text Secondary: `215 25% 70%` (muted)
- Success: `142 76% 36%` (green for successful operations)
- Error: `0 84% 60%` (red for errors)

**Light Mode**:
- Background: `0 0% 98%`
- Surface: `0 0% 100%`
- Primary: `45 93% 48%`
- Text Primary: `222 84% 5%`
- Text Secondary: `215 16% 47%`

### Typography
- **Primary**: Inter (Google Fonts CDN)
- **Monospace**: JetBrains Mono (for addresses, technical data)
- Scale: text-sm, text-base, text-lg, text-xl, text-2xl only

### Layout System
**Tailwind Spacing**: Consistent use of units 2, 4, 6, 8, 12, 16
- Micro spacing: `p-2, m-2`
- Standard spacing: `p-4, gap-4, space-y-4`
- Section spacing: `p-6, gap-6`
- Major spacing: `p-8, my-8`
- Container spacing: `p-12, my-16`

## Component Library

### Core Components
1. **Wallet Connection Card**
   - Prominent centered placement when disconnected
   - Clean list of supported wallets with icons
   - Connection status indicator

2. **Token Creation Form**
   - Single-column layout with logical grouping
   - Floating labels or clear input labels
   - Upload area with drag-and-drop for logo
   - Network selector (Devnet/Mainnet toggle)

3. **Progress States**
   - Loading states for each transaction step
   - Clear progress indicators during token creation
   - Success state with mint address and actions

4. **Result Card**
   - Mint address with copy button
   - Solscan link button
   - Success confirmation with visual feedback

### Navigation & Layout
- **Single-page application** with state-based views
- **Header**: Logo, network indicator, wallet connection status
- **Main content**: Centered, max-width container
- **No sidebar** - keep interface focused and uncluttered

### Interactions
- **Toast notifications** for errors and success states
- **Copy-to-clipboard** functionality with visual feedback
- **Loading spinners** during blockchain operations
- **Form validation** with inline error messages

## Visual Treatment
- **Minimal gradients**: Subtle background gradient from dark to slightly lighter dark
- **Card elevation**: Soft shadows on form containers and result cards
- **Border radius**: Consistent rounded corners (rounded-lg: 8px)
- **Focus states**: Clear visual focus indicators for accessibility

## Key UX Principles
1. **Progressive disclosure**: Show only relevant steps based on wallet connection status
2. **Clear feedback**: Every user action has immediate visual response
3. **Error prevention**: Form validation and clear labeling
4. **Recovery paths**: Clear error messages with suggested actions
5. **Technical transparency**: Show transaction hashes and addresses clearly

## Mobile Considerations
- **Responsive design** with mobile-first approach
- **Touch-friendly** button sizes (minimum 44px height)
- **Readable text** at mobile sizes
- **Simplified layout** on smaller screens

This design prioritizes clarity and functionality while maintaining a professional appearance suitable for blockchain interactions.