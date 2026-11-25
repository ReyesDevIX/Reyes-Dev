export function Signal({ className = '' }: { className?: string }) {
  return <span className={'signal ' + className} aria-hidden="true">
    <span /><span /><span /><span />
  </span>;
}
