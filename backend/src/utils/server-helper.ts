import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export async function startScheduledSelfPinging(url: string) {
  const minutes = Number(process.env.healthPingInterval || "12");
  const INTERVAL_MINUTES = minutes * 60 * 1000; // Keeps container warm before the 15-minute sleep deadline

  const startHour = 11; //11: am
  const endHour = 22; //10: pm
  let totalPings = 0;
  let successfulPings = 0;
  let failedPings = 0;

  console.log(
    `📡 [Engine Wakeup] Scheduled self-ping daemon active. Target window: ${startHour}:00 - ${endHour}:00. Ping server time for every ${minutes} minutes. Endpoint: ${url}`,
  );

  setInterval(async () => {
    const now = dayjs.tz("Asia/Kolkata");
    const currentHour = now.hour();
    const timestamp = now.format("HH:mm:ss");

    if (currentHour >= startHour && currentHour < endHour) {
      try {
        totalPings++;
        const startTime = performance.now();
        const response = await fetch(url);
        const duration = (performance.now() - startTime).toFixed(0);

        if (response.ok) {
          successfulPings++;
          console.log(
            `📡 [Ping Success:${successfulPings}/${totalPings}] [${timestamp}] Inbound heartbeat received by ${url} | Status: ${response.status} | Latency: ${duration}ms`,
          );
        } else {
          failedPings++;
          console.log(
            `⚠️ [Ping Warning]:${failedPings}/${totalPings} [${timestamp}] Destination reached but returned non-200 status | URL: ${url} | Status: ${response.status}`,
          );
        }
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Unknown network exception";
        console.log(
          `❌ [Ping Failure] [${timestamp}] Egress connection timeout or handshake drop | Target: ${url} | Reason: ${message}`,
        );
      }
    } else {
      console.log(
        `💤 [Ping Sleep] [${timestamp}] Current hour (${currentHour}:00) falls outside active window. Throttling outbound requests to conserve free tier hours.`,
      );
    }
  }, INTERVAL_MINUTES);
}
