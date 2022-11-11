import { Ref, MutableRefObject } from 'react';

/**
 * "Merges" refs. This function will update multiple refs attached to one object.
 * Best example is a forwardRef and a local Ref. You can merge the forwarded ref
 * and the local ref on an input like so.
 *
 * <input ref={assignRefs(localRef, forwardRef)} />
 * @param refs All refs you want to merge
 * @returns
 */
export const assignRefs = <T extends unknown>(...refs: Ref<T | null>[]) => {
    return (node: T | null) => {
        refs.forEach(r => {
            if (typeof r === 'function') {
                r(node);
            } else if (r) {
                (r as MutableRefObject<T | null>).current = node;
            }
        });
    };
};
