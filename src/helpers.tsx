import React from "react";

export const renderRows = (rows: string[]) =>
  rows.map(row => (
    <span key={row.toString()}>
      {row}
      <br />
    </span>
  ));

export function throttle(timeout: number, fn: (...any) => any) {
  let lastExecuted = Date.now();

  return (...args) => {
    const now = Date.now();
    const delta = now - lastExecuted;

    if (delta > timeout) {
      lastExecuted = now;

      return fn(...args);
    }
  };
}
