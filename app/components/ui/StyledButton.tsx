"use client";

import React from 'react';

const IndianOrnamentSVG = ({ className }: { className?: string }) => (
    <svg
        className={className}
        width="16"
        height="32"
        viewBox="0 0 16 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Stepped traditional border ornament with diamond cutout */}
        <path
            d="M16 2H12V6H8V10H4V14H1.5L0 16L1.5 18H4V22H8V26H12V30H16ZM12 16L9 19L6 16L9 13Z"
            fill="currentColor"
            fillRule="evenodd"
        />
    </svg>
);

type CommonProps = {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
};

type ButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
};

type AnchorProps = CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
};

type StyledButtonProps = ButtonProps | AnchorProps;

const StyledButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, StyledButtonProps>(
    (props, ref) => {
        const { children, className, variant = 'primary', href, ...restProps } = props;
        const baseClasses = "group relative inline-flex items-center justify-center px-10 py-3 text-base font-serif font-medium tracking-wide transition-all duration-300 ease-out rounded-[6px] select-none";

        // Detect class overrides to prevent Tailwind conflicts
        const hasBgOverride = className?.includes("bg-");
        const hasTextOverride = className?.includes("text-");
        const hasBorderOverride = className?.includes("border-");

        // Set default variant styling
        const primaryBg = "bg-[#680007] hover:bg-[#3D0004]";
        const primaryText = "text-[#faf8f5]";
        const primaryBorder = "";

        const secondaryBg = "bg-transparent hover:bg-[#680007]";
        const secondaryText = "text-[#680007] hover:text-[#faf8f5]";
        const secondaryBorder = "border border-[#680007]/30";

        const bgClass = variant === 'primary'
            ? (hasBgOverride ? "" : primaryBg)
            : (hasBgOverride ? "" : secondaryBg);

        const textClass = variant === 'primary'
            ? (hasTextOverride ? "" : primaryText)
            : (hasTextOverride ? "" : secondaryText);

        const borderClass = variant === 'primary'
            ? (hasBorderOverride ? "" : primaryBorder)
            : (hasBorderOverride ? "" : secondaryBorder);

        const combinedClasses = `${baseClasses} ${bgClass} ${textClass} ${borderClass} ${className || ''}`;

        // Determine ornament color based on variant and overridden class names
        let ornamentClass = "";
        if (variant === 'primary') {
            ornamentClass = "text-[#680007] group-hover:text-[#3D0004]";
        } else {
            ornamentClass = "text-[#680007] group-hover:text-[#680007]";

            // Check overrides in className to make ornaments blend seamlessly in other sections
            if (className?.includes("bg-white")) {
                // Footer secondary style: white background button
                ornamentClass = "text-white group-hover:text-[#b38e5d]";
            } else if (className?.includes("text-white") || className?.includes("border-white")) {
                // Header secondary style: transparent/white outline button
                ornamentClass = "text-white opacity-40 group-hover:opacity-100";
            }
        }

        const content = (
            <>
                {/* Left side ornament sticking out */}
                <IndianOrnamentSVG className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[95%] transition-all duration-300 ${ornamentClass}`} />

                {/* Glare container (overflow-hidden to prevent glare spilling outside the button body) */}
                <span className="absolute inset-0 w-full h-full rounded-[6px] overflow-hidden pointer-events-none">
                    {/* Glare effect */}
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-20 z-20" />
                </span>

                <div className="relative z-10 flex items-center justify-center space-x-2">
                    {children}
                </div>

                {/* Right side ornament sticking out */}
                <IndianOrnamentSVG className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-[95%] scale-x-[-1] transition-all duration-300 ${ornamentClass}`} />
            </>
        );

        if (href) {
            return (
                <a
                    href={href}
                    className={combinedClasses}
                    {...(restProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
                    ref={ref as React.Ref<HTMLAnchorElement>}
                >
                    {content}
                </a>
            );
        }

        return (
            <button className={combinedClasses} {...(restProps as React.ButtonHTMLAttributes<HTMLButtonElement>)} ref={ref as React.Ref<HTMLButtonElement>}>
                {content}
            </button>
        );
    }
);

StyledButton.displayName = 'StyledButton';
export default StyledButton;