import { useRef } from "react";

export default function useFormData(refs = {}) {
  const allRefs = useRef(refs);

  const getData = () => {
    const response = {};
    for (let [key, value] of Object.entries(allRefs.current)) {
      response[key] = value.current.value;
    }

    return response;
  }

  const resetData = () => {
    Object.values(allRefs.current).forEach(ref => {
      ref.current.value = ''
    })
  }

  return [getData, resetData]
}