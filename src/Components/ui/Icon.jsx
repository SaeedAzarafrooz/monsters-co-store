import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/utils";

const iconVariants = cva("shrink-0 select-none inline-block align-middle", {
  variants: {
    size: {
      xs: "w-3.5 h-3.5",
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-8 h-8",
      "2xl": "w-10 h-10",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// مخزن وکتورها و SVGهای استخراج‌شده از پروژه
const ICONS = {
  // Navigation & General
  home: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  ),
  bag: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    />
  ),
  cart: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    />
  ),
  info: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  ),
  orders: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    />
  ),
  grid: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    />
  ),

  // Actions & States
  check: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 13l4 4L19 7"
    />
  ),
  "check-circle": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  ),
  trash: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  ),
  heart: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  ),
  plus: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4v16m8-8H4"
    />
  ),
  minus: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20 12H4"
    />
  ),
  close: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  ),

  // Chevrons & Arrows
  "chevron-down": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 9l-7 7-7-7"
    />
  ),
  "chevron-right": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 5l7 7-7 7"
    />
  ),
  "arrow-right": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  ),
  "arrow-left": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  ),
  "arrow-up": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 10l7-7m0 0l7 7m-7-7v18"
    />
  ),

  // Profile / Settings / Misc
  pin: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  ),
  creditCard: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    />
  ),
  moon: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  ),
  logout: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  ),
  filter: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
    />
  ),
  // Extra: NotFound / UnderConstruction / Card placeholder / Brand
  "sad-face": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
    />
  ),
  flask: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
    />
  ),
  imageLoading: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A1.5 1.5 0 0021.75 19.5V4.5A1.5 1.5 0 0020.25 3H3.75A1.5 1.5 0 002.25 4.5v15A1.5 1.5 0 003.75 21zm10.5-11.25h.008v.008h-.008V9.75zm-.375 0h.375v.375h-.375V9.75z"
    />
  ),
  google: (
    <g stroke="none">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.57 5.57 0 01-2.4 3.58v3h3.86c2.26-2.09 3.59-5.17 3.59-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0012 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29A7.2 7.2 0 014.89 12c0-.8.14-1.57.38-2.29V6.62H1.29a11.99 11.99 0 000 10.76l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.69 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </g>
  ),

  // Social / Communication Channels (Normalized to 512x512 with balanced visual weights)
  telegram: {
    viewBox: "0 0 512 512",
    fill: "currentColor",
    strokeWidth: 0,
    content: (
      <g transform="translate(0, 512) scale(0.1, -0.1)">
        <path d="M4680 4679 c-25 -6 -304 -109 -620 -229 -676 -256 -1530 -580 -2850 -1080 -525 -199 -975 -370 -1000 -381 -204 -90 -269 -279 -145 -417 24 -26 65 -59 92 -74 26 -14 266 -106 533 -203 267 -98 490 -182 497 -189 6 -6 122 -265 258 -576 135 -311 255 -587 268 -615 33 -74 130 -167 203 -195 73 -28 177 -31 251 -6 86 28 158 84 376 291 115 108 214 194 220 192 7 -3 239 -161 517 -352 278 -192 528 -359 557 -372 207 -95 421 -17 518 190 30 64 75 269 397 1822 396 1911 387 1861 345 1983 -45 128 -157 210 -298 217 -41 2 -94 -1 -119 -6z m128 -301 c7 -7 12 -26 12 -44 0 -17 -47 -258 -104 -535 -58 -277 -220 -1062 -361 -1743 -141 -682 -263 -1252 -271 -1268 -24 -46 -58 -63 -102 -49 -20 6 -246 155 -502 332 -256 176 -644 443 -862 592 -218 150 -396 275 -395 278 2 6 125 120 1052 970 297 272 552 510 567 527 53 63 46 146 -18 201 -40 35 -72 46 -117 38 -18 -3 -149 -68 -292 -145 -367 -197 -1890 -1013 -2011 -1078 -56 -30 -107 -54 -115 -54 -16 0 -891 319 -901 329 -4 3 57 30 135 60 127 48 1077 408 2207 836 223 85 734 278 1135 431 970 368 916 349 943 322z m-2088 -1571 c-8 -8 -204 -187 -435 -399 -231 -211 -427 -393 -435 -403 -12 -14 -16 -67 -22 -249 -4 -127 -9 -252 -10 -278 -3 -44 -11 -29 -162 320 -88 201 -156 367 -150 369 5 2 279 150 609 328 330 178 604 324 610 324 5 1 3 -5 -5 -12z m-406 -1297 c96 -66 177 -124 180 -129 3 -4 -11 -23 -32 -42 -20 -18 -103 -95 -183 -171 -80 -76 -149 -138 -153 -138 -3 0 -6 135 -6 300 0 174 4 300 9 300 5 0 88 -54 185 -120z" />
      </g>
    ),
  },

 linkedin: {
    viewBox: "0 0 512 512",
    fill: "currentColor",
    strokeWidth: 0,
    content: (
      <g transform="translate(19, 493) scale(0.106, -0.106)">
        <path d="M2015 4359 c-186 -18 -402 -72 -595 -148 -476 -189 -888 -577 -1111 -1046 -83 -175 -127 -313 -171 -530 -29 -145 -36 -478 -14 -635 68 -468 253 -849 573 -1181 208 -215 432 -369 703 -482 427 -179 892 -213 1352 -101 356 87 716 292 980 558 357 359 561 801 608 1321 39 413 -84 906 -315 1265 -172 268 -433 524 -695 682 -390 235 -857 340 -1315 297z m453 -164 c667 -83 1235 -491 1533 -1101 138 -283 207 -653 180 -966 -41 -480 -230 -888 -565 -1223 -480 -479 -1166 -676 -1831 -526 -841 190 -1464 918 -1514 1769 -21 353 45 673 204 989 193 384 484 672 870 862 298 147 543 207 865 210 75 0 191 -6 258 -14z" />
        <path d="M1461 3389 c-142 -27 -232 -180 -186 -319 63 -188 313 -230 432 -72 137 181 -21 432 -246 391z" />
        <path d="M2675 2741 c-86 -24 -166 -73 -224 -137 l-51 -56 0 86 0 86 -205 0 -205 0 0 -675 0 -675 205 0 205 0 0 400 c0 374 1 403 20 453 40 106 130 162 250 155 85 -4 142 -39 177 -108 35 -68 42 -163 43 -547 l0 -353 211 0 211 0 -5 488 c-4 527 -5 537 -63 657 -73 154 -236 246 -434 244 -41 0 -102 -8 -135 -18z" />
        <path d="M1300 2045 l0 -675 210 0 210 0 0 675 0 675 -210 0 -210 0 0 -675z" />
      </g>
    ),
  },

  mobile: {
    viewBox: "0 0 512 512",
    fill: "currentColor",
    strokeWidth: 0,
    content: (
      <g
        transform="translate(0, 512) scale(0.0853, -0.0853)"
        stroke="currentColor"
        strokeWidth="110"
        strokeLinejoin="round"
      >
        <path d="M1941 5634 c-173 -46 -324 -203 -360 -374 -9 -41 -11 -606 -9 -2295 l3 -2240 37 -78 c67 -140 191 -244 333 -282 89 -23 2021 -23 2110 0 171 45 315 185 361 352 18 65 19 151 19 2283 0 2132 -1 2218 -19 2283 -46 166 -191 307 -361 352 -86 22 -2031 22 -2114 -1z m2112 -123 c112 -39 194 -117 239 -229 l23 -57 3 -2190 c2 -1608 0 -2206 -8 -2250 -24 -122 -103 -225 -215 -281 l-60 -29 -1035 0 -1035 0 -58 28 c-115 57 -198 170 -218 298 -6 41 -9 849 -7 2244 3 2062 4 2182 21 2225 45 115 138 207 245 241 54 17 118 18 1053 18 960 1 998 0 1052 -18z" />
        <path d="M2665 5380 c-74 -30 -108 -136 -65 -205 40 -64 43 -65 402 -65 303 0 325 1 355 20 89 54 82 200 -11 244 -29 14 -79 16 -348 15 -172 0 -322 -4 -333 -9z" />
        <path d="M2476 738 c-22 -31 -20 -45 9 -73 l24 -25 491 0 491 0 24 25 c29 28 31 42 9 73 l-15 22 -509 0 -509 0 -15 -22z" />
      </g>
    ),
  },

  mail: {
    viewBox: "0 0 512 512",
    fill: "currentColor",
    strokeWidth: 0,
    content: (
      <g
        transform="translate(26, 486) scale(0.09, -0.09)"
        stroke="currentColor"
        strokeWidth="60"
        strokeLinejoin="round"
      >
        <path d="M193 4393 c-61 -21 -136 -92 -164 -155 l-24 -53 0 -1625 0 -1625 24 -53 c29 -65 104 -134 168 -156 66 -22 4641 -25 4715 -2 81 24 137 71 172 145 l31 66 0 1625 0 1625 -24 53 c-29 65 -104 134 -168 156 -69 24 -4664 23 -4730 -1z m4477 -216 c-8 -8 -42 -36 -75 -64 -33 -27 -489 -414 -1014 -859 -524 -445 -960 -813 -967 -819 -18 -13 97 -104 -1036 815 -546 443 -1028 832 -1070 865 -42 33 -77 63 -77 68 -1 4 956 7 2126 7 1772 0 2125 -2 2113 -13z m170 -1608 l0 -1461 -47 53 c-27 30 -122 135 -213 234 -91 99 -370 403 -620 675 -249 272 -487 530 -528 573 l-75 78 44 37 c70 59 1329 1174 1384 1225 28 25 51 46 53 47 1 0 2 -657 2 -1461z m-4476 1378 c70 -63 1335 -1133 1411 -1194 l40 -32 -61 -63 c-33 -35 -350 -364 -704 -733 -353 -369 -671 -699 -706 -735 l-64 -65 0 1443 c0 793 3 1442 6 1442 4 0 39 -29 78 -63z m1956 -1644 c219 -175 245 -193 280 -193 44 0 39 -4 335 244 l200 168 290 -296 c160 -162 512 -521 784 -796 l493 -500 -2146 0 c-1180 0 -2146 2 -2146 4 0 4 -37 -32 900 875 642 621 736 709 751 698 10 -6 126 -99 259 -204z" />
      </g>
    ),
  },
};

export const Icon = forwardRef(
  (
    {
      name,
      size,
      className,
      strokeWidth: propStrokeWidth,
      fill: propFill,
      viewBox: propViewBox,
      ...props
    },
    ref
  ) => {
    const iconEntry = ICONS[name];

    if (!iconEntry) {
      console.warn(`[Icon]: "${name}" is not registered in ICONS map.`);
      return null;
    }

    const isCustomConfig =
      typeof iconEntry === "object" && iconEntry !== null && "content" in iconEntry;

    const iconPath = isCustomConfig ? iconEntry.content : iconEntry;
    const finalViewBox =
      propViewBox || (isCustomConfig && iconEntry.viewBox ? iconEntry.viewBox : "0 0 24 24");
    const finalFill =
      propFill !== undefined
        ? propFill
        : isCustomConfig && iconEntry.fill !== undefined
        ? iconEntry.fill
        : "none";
    const finalStrokeWidth =
      propStrokeWidth !== undefined
        ? propStrokeWidth
        : isCustomConfig && iconEntry.strokeWidth !== undefined
        ? iconEntry.strokeWidth
        : 2;

    return (
      <svg
        ref={ref}
        viewBox={finalViewBox}
        fill={finalFill}
        stroke="currentColor"
        strokeWidth={finalStrokeWidth}
        preserveAspectRatio="xMidYMid meet"
        className={cn(iconVariants({ size, className }))}
        {...props}
      >
        {iconPath}
      </svg>
    );
  }
);

Icon.displayName = "Icon";
