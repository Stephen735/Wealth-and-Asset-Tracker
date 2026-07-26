"use client";

export default function Error({ reset }: { reset: () => void }) {
    return (
        <main>
            <section>
                <h2>Sorry about that</h2>
                <p style={{ color: "#999", margin: "1rem 0", fontSize: "0.9rem" }}>
                    Something went wrong. Please try again.
                </p>
                <button onClick={reset}>Try Again</button>
            </section>
        </main>
    );
}
