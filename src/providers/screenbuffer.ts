import { IConfig } from 'config';
import { ScreenBuffer, Terminal } from 'terminal-kit';
import { instanceCachingFactory } from 'tsyringe';

export default {
  token: 'screenbuffer',
  useFactory: instanceCachingFactory((container) => {
    const term = container.resolve<Terminal>('term');
    const config = container.resolve<IConfig>('config');
    return new ScreenBuffer({ dst: term, width: config.fieldWidth, height: config.fieldHeight });
  })
}
