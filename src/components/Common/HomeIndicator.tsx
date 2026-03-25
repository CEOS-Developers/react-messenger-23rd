interface HomeIndicatorProps {
  className?: string;
}

const HomeIndicator = ({ className = "" }: HomeIndicatorProps) => (
  <div className={`flex w-full items-center justify-center ${className}`}>
    <div className="rounded-100 bg-label h-1.25 w-33.5" />
  </div>
);

export default HomeIndicator;
