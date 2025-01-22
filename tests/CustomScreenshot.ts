import { CustomScreenshotWriter, Gauge } from "gauge-ts";
import { page } from './StepImplementation';
import { join, basename } from "path";

export default class ScreenshotWriter {
  @CustomScreenshotWriter()
  public async ssw(): Promise<string> {
    try {
      const screenshotFilePath = join(
        __dirname,
        `../screenshots/screenshot-${Date.now()}.png`
      );
      if (page && !page.isClosed()) {
        await page.screenshot({ path: screenshotFilePath });
        return basename(screenshotFilePath);
      } else {
        return '';
      }
    } catch (error) {
      Gauge.writeMessage(`Error when taking screenshot: ${error}`);
      return ''
    }
  }
}