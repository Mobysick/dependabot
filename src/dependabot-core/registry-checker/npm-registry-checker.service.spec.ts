import { NpmRegistryCheckerService } from './npm-registry-checker.service';

describe('NpmRegistryCheckerServices / isOutdated', () => {
  it('returns false when comparing equal versions', () => {
    const service = new NpmRegistryCheckerService();
    const isOutdated = service.isOutdated('1.0.0', '1.0.0');
    expect(isOutdated).toStrictEqual(false);
  });

  it('returns current and wanted when comparing non equal versions', () => {
    const service = new NpmRegistryCheckerService();
    const isOutdated = service.isOutdated('1.0.0', '1.0.1');
    expect(isOutdated).toStrictEqual({ current: '1.0.0', wanted: '1.0.1' });
  });
});
