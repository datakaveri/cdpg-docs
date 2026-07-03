import React, {type ComponentType, type ReactNode} from 'react';
import './diagrams.css';

export type LegendItem = {
  color: 'orange' | 'navy' | 'teal' | 'green' | 'berry';
  label: string;
};

/**
 * Static diagram wrapper: mono frame bar on top, optional semantic-color
 * legend underneath. `svg` is an SVGR-imported component so the artwork
 * inherits the page's CSS variables (light/dark aware).
 */
export default function DiagramFrame({
  svg: Svg,
  label,
  legend,
  children,
}: {
  svg?: ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  legend?: LegendItem[];
  children?: ReactNode;
}): ReactNode {
  return (
    <figure className="dx-diagram">
      <div className="dx-frame">
        <span className="dx-frame-lbl">{label}</span>
        <span className="dx-frame-dots">
          <i />
          <i />
          <i />
        </span>
      </div>
      {Svg ? <Svg role="img" aria-label={label} /> : children}
      {legend && legend.length > 0 && (
        <div className="dx-legend">
          {legend.map((it) => (
            <span key={it.label} className={`lg-${it.color}`}>
              <i />
              {it.label}
            </span>
          ))}
        </div>
      )}
    </figure>
  );
}
