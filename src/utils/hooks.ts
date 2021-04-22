import { useEffect } from "react";

export function useAsyncEffect(callback: Function, deps = []) {
  useEffect(() => {
    callback();
  }, deps);
}
