export default function Grid() {
    return (
        <div
            className="absolute inset-0 z-0"
            style={{
            backgroundImage: `
                linear-gradient(to right, #e7e5e4 1px, transparent 1px),
                linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
                linear-gradient(to right, black 0%, black 50%, transparent 50%, transparent 100%),
                    repeating-linear-gradient(
                    to right,
                    black 0px,
                    black 3px,
                    transparent 3px,
                    transparent 8px
                    ),
                    repeating-linear-gradient(
                    to bottom,
                    black 0px,
                    black 3px,
                    transparent 3px,
                    transparent 8px
                    )
            `,
            WebkitMaskImage: `
            linear-gradient(to right, black 0%, black 50%, transparent 50%, transparent 100%),
                    repeating-linear-gradient(
                    to right,
                    black 0px,
                    black 3px,
                    transparent 3px,
                    transparent 8px
                    ),
                    repeating-linear-gradient(
                    to bottom,
                    black 0px,
                    black 3px,
                    transparent 3px,
                    transparent 8px
                    )
            `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
            }}
        />
    )
}
