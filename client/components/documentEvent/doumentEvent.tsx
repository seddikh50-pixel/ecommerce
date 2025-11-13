import { RefObject } from "react";

export function createClickOutsideHandler<T extends HTMLElement>(
    ref: RefObject<T | null>,

    callback: () => void
) {
    return (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            callback();
        }
    };
}