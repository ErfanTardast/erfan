import { appEnv } from '@/lib/config/env';
import { defaultFlags } from '@/lib/flags/flags';
import { createAnalyticsEvent, type AnalyticsEventName, type AnalyticsEvent } from './events';

type TrackContext = {
  route: string;
  anonymousId?: string;
};

type EventPayload<N extends AnalyticsEventName> = Parameters<typeof createAnalyticsEvent<N>>[1];

export type AnalyticsSink = (event: AnalyticsEvent) => void | Promise<void>;

const localConsoleSink: AnalyticsSink = (event) => {
  if (appEnv.NEXT_PUBLIC_ANALYTICS_DEBUG) {
    console.info('[analytics]', event.name, event);
  }
};

let sink: AnalyticsSink = localConsoleSink;

export function setAnalyticsSink(nextSink: AnalyticsSink) {
  sink = nextSink;
}

export async function track<N extends AnalyticsEventName>(
  name: N,
  payload: EventPayload<N>,
  context: TrackContext,
) {
  if (!defaultFlags.analyticsEnabled) return;
  const event = createAnalyticsEvent(name, payload, context);
  await sink(event);
}
