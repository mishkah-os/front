# HTMLx JSX Compatibility Status

This library aims for JSX parity but still has a few intentional gaps. Current behavior is based on `lib/mishkah-react.js`.

## Supported features
- **Dynamic components**: Opening, closing, and self-closing dynamic tags like `<${Card}>` and `<${Icon} />` are rewritten to internal placeholders so the correct component function is invoked when parsing. The placeholder stack pairs closing tags with their matching openings, even when the same component type repeats.  
- **Props**: String, number, boolean, and function props are preserved, and spread props (`...${props}`) are applied via `data-m-spread` placeholders. Attribute placeholders (`prop=${value}`) are rewritten as `m-ph-*` tokens and restored after parsing.  
- **Children**: Inline expressions, arrays (e.g., `items.map(...)`), and nested components are kept as child placeholders so non-string children survive DOM parsing. Multiple top-level nodes are returned as an array when present.

## Unsupported or partial features
- **Fragments (`<>...</>`)**: The parser treats literal angle brackets as tag boundaries and does not have a fragment placeholder, so fragment syntax is not recognized. You need to wrap content in a real element or return an array of nodes instead.
- **JSX comments (`{/* ... */}`)**: Comment markers are emitted as plain text; they are not stripped like in JSX.
- **Whitespace-sensitive JSX edge cases**: The tokenizer relies on string trimming rules for detecting contexts such as `<`, `</`, and `...`. Unusual whitespace may produce unexpected results compared to a full JSX parser.

## Practical guidance
- Use real container elements or arrays instead of fragments.
- Keep comment-style annotations outside of `html`` templates.
- Prefer conventional spacing around tags and spreads for predictable parsing.

This summary should help you decide whether additional JSX features need to be polyfilled at call sites.
