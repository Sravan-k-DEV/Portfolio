import { cn } from "@/lib/utils";

export function ConfusedBot({ className }: { className?: string }) {
  return (
    <svg
      className={cn("confused-bot", className)}
      viewBox="0 0 360 300"
      fill="none"
      aria-hidden
    >
      <ellipse
        className="bot-shadow"
        cx="180"
        cy="276"
        rx="92"
        ry="11"
        fill="currentColor"
        opacity="0.08"
      />

      <g className="bot-wires" strokeLinecap="round" fill="none">
        <path
          className="bot-wire-a"
          d="M28 168c42-78 78 86 128 18 38-52 78-8 118 22 28 22 52 8 78-18"
          stroke="var(--primary)"
          strokeWidth="3.2"
        />
        <path
          className="bot-wire-b"
          d="M22 228c54-18 62-96 112-42 36 38 86 64 142 8 32-32 48-12 62 14"
          stroke="currentColor"
          strokeWidth="2.6"
          opacity="0.55"
        />
        <path
          className="bot-wire-c"
          d="M48 124c38 92 96-28 132 36 28 48 78 18 116-22"
          stroke="var(--primary)"
          strokeWidth="2.2"
          opacity="0.7"
        />
        <rect
          x="16"
          y="160"
          width="16"
          height="12"
          rx="2"
          fill="var(--primary)"
        />
        <rect
          x="328"
          y="146"
          width="16"
          height="12"
          rx="2"
          fill="currentColor"
          opacity="0.7"
        />
      </g>

      <g className="bot-figure">
        <g className="bot-arm-l">
          <path
            d="M148 148c-22 10-38 26-46 44"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <circle cx="98" cy="196" r="9" fill="var(--primary)" />
          <path
            d="M90 196h-14M98 188v-12"
            stroke="var(--primary)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </g>
        <g className="bot-arm-r">
          <path
            d="M212 148c24 8 42 28 50 46"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <circle cx="266" cy="198" r="9" fill="var(--primary)" />
          <path
            d="M266 190v-12M274 198h12"
            stroke="var(--primary)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </g>

        <rect
          x="142"
          y="128"
          width="76"
          height="86"
          rx="18"
          fill="currentColor"
        />
        <rect
          x="154"
          y="142"
          width="52"
          height="34"
          rx="8"
          fill="var(--background)"
          stroke="var(--primary)"
          strokeWidth="1.5"
        />
        <g className="bot-glyphs">
          <text
            x="162"
            y="164"
            fill="var(--primary)"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
          >
            ?? 01
          </text>
          <text
            x="162"
            y="176"
            fill="var(--primary)"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
            opacity="0.7"
          >
            ## --
          </text>
        </g>
        <circle className="bot-led" cx="168" cy="190" r="3.5" fill="var(--primary)" />
        <circle cx="192" cy="190" r="3.5" fill="var(--background)" opacity="0.35" />

        <rect x="150" y="208" width="22" height="28" rx="6" fill="currentColor" />
        <rect x="188" y="208" width="22" height="28" rx="6" fill="currentColor" />

        <g className="bot-head">
          <line
            x1="180"
            y1="72"
            x2="180"
            y2="52"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle className="bot-antenna" cx="180" cy="46" r="7" fill="var(--primary)" />
          <rect x="146" y="70" width="68" height="62" rx="20" fill="currentColor" />
          <rect
            x="154"
            y="84"
            width="52"
            height="38"
            rx="13"
            fill="var(--background)"
          />
          <g className="bot-eye-l">
            <circle cx="170" cy="103" r="6" fill="currentColor" />
            <circle className="bot-pupil" cx="171.5" cy="103.5" r="2.2" fill="var(--background)" />
          </g>
          <g className="bot-eye-r">
            <circle cx="190" cy="103" r="6" fill="currentColor" />
            <circle className="bot-pupil" cx="191.5" cy="103.5" r="2.2" fill="var(--background)" />
          </g>
          <rect className="bot-lid" x="164" y="96" width="12" height="14" rx="3" fill="currentColor" />
          <rect className="bot-lid" x="184" y="96" width="12" height="14" rx="3" fill="currentColor" />
          <path
            d="M170 116c4 4 16 4 20 0"
            stroke="var(--background)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </g>

      <g className="bot-spark" stroke="var(--primary)" strokeWidth="1.8" strokeLinecap="round">
        <path d="M84 176v-10M79 171h10" />
        <path d="M292 168v-8M288 164h8" />
      </g>

      <text
        className="bot-query"
        x="232"
        y="58"
        fill="currentColor"
        fontSize="32"
        fontFamily="var(--font-source-serif), ui-serif, Georgia, serif"
      >
        ?
      </text>
    </svg>
  );
}
