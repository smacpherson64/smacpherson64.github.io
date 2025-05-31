import { type ComponentProps } from "react";
import * as Components from "npm:@react-pdf/renderer";
import { createTw } from "npm:react-pdf-tailwind";

const tw = createTw({});

export { Document, Page } from "npm:@react-pdf/renderer";

export function View({
  className,
  ...props
}: ComponentProps<typeof Components.View> & { className?: string }) {
  const style = className ? tw(className) : undefined;
  return <Components.View style={style} {...props} />;
}

export function Text({
  className,
  ...props
}: ComponentProps<typeof Components.Text> & { className?: string }) {
  const style = className ? tw(className) : undefined;
  return <Components.Text style={style} {...(props as any)} />;
}
