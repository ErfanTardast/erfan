type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export type LogRecord = {
  level: LogLevel;
  message: string;
  timestamp: string;
  component?: string;
  route?: string;
  context?: Record<string, unknown>;
};

const sensitiveKeyPattern = /(email|phone|mobile|address|postal|name|token|secret|password)/i;

export function redactValue(value: unknown): unknown {
  if (typeof value === 'string') {
    if (value.includes('@')) return maskEmail(value);
    if (/^\+?\d[\d\s-]{7,}$/.test(value)) return maskPhone(value);
    return value;
  }
  if (Array.isArray(value)) return value.map(redactValue);
  if (value && typeof value === 'object') return redactObject(value as Record<string, unknown>);
  return value;
}

export function redactObject(input: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(input).map(([key, value]) => [
      key,
      sensitiveKeyPattern.test(key) ? '[redacted]' : redactValue(value),
    ]),
  );
}

export function maskEmail(email: string) {
  const [user, domain] = email.split('@');
  if (!domain) return '[redacted]';
  return `${user.slice(0, 2)}***@${domain}`;
}

export function maskPhone(phone: string) {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 7) return '[redacted]';
  return `${digits.slice(0, 4)}***${digits.slice(-2)}`;
}

export function createLogRecord(input: Omit<LogRecord, 'timestamp'>): LogRecord {
  return {
    ...input,
    timestamp: new Date().toISOString(),
    context: input.context ? redactObject(input.context) : undefined,
  };
}

export function log(input: Omit<LogRecord, 'timestamp'>) {
  const record = createLogRecord(input);
  const method = record.level === 'error' ? 'error' : record.level === 'warn' ? 'warn' : 'info';
  console[method]('[keyvan]', JSON.stringify(record));
}
