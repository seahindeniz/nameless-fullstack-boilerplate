declare module '*.svg' {
  const content: React.FC<React.SVGAttributes<SVGElement>>;

  export default content;
}

declare module '*.jpg' {
  const content: string;

  export default content;
}

declare module '*.png' {
  const content: string;

  export default content;
}

declare module '*.json' {
  const content: string;

  export default content;
}
