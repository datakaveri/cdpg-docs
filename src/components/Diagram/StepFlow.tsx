import React, {
  type ComponentType,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import type {LegendItem} from './DiagramFrame';
import './diagrams.css';

export type FlowStep = {
  title: string;
  body: string;
  /** ids of SVG elements (paths, edge labels, node groups) lit by this step */
  lights?: string[];
};

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Interactive flow diagram: the SVG stays pinned above a numbered step
 * list; selecting a step (click, ←/→, or prev/next) adds a `lit` class
 * to that step's SVG elements so its paths and nodes light up while the
 * rest stay dimmed — same storytelling device as a scrollytelling doc,
 * without scroll-jacking the docs layout.
 */
export default function StepFlow({
  svg: Svg,
  label,
  steps,
  legend,
}: {
  svg: ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  steps: FlowStep[];
  legend?: LegendItem[];
}): ReactNode {
  const [active, setActive] = useState(0);
  const svgWrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = svgWrap.current;
    if (!root) return;
    root.querySelectorAll('.lit').forEach((el) => el.classList.remove('lit'));
    for (const id of steps[active]?.lights ?? []) {
      root.querySelector(`#${CSS.escape(id)}`)?.classList.add('lit');
    }
  }, [active, steps]);

  const prev = () => setActive((i) => Math.max(0, i - 1));
  const next = () => setActive((i) => Math.min(steps.length - 1, i + 1));

  return (
    <figure
      className="dx-diagram"
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
      }}
    >
      <div className="dx-frame">
        <span className="dx-frame-lbl">{label}</span>
        <span className="dx-frame-ctr">
          {pad(active + 1)} / {pad(steps.length)}
        </span>
        <span className="dx-stepnav">
          <button type="button" onClick={prev} disabled={active === 0} aria-label="Previous step">
            ←
          </button>
          <button
            type="button"
            onClick={next}
            disabled={active === steps.length - 1}
            aria-label="Next step"
          >
            →
          </button>
        </span>
      </div>
      <div ref={svgWrap}>
        <Svg role="img" aria-label={label} />
      </div>
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
      <div className="dx-steps" role="tablist" aria-label={`${label} steps`}>
        {steps.map((s, i) => (
          <button
            type="button"
            role="tab"
            aria-selected={i === active}
            key={s.title}
            className={`dx-step${i === active ? ' is-active' : ''}`}
            onClick={() => setActive(i)}
          >
            <span className="dx-step-num">{pad(i + 1)}</span>
            <span>
              <h4>{s.title}</h4>
              <p>{s.body}</p>
            </span>
          </button>
        ))}
      </div>
    </figure>
  );
}
