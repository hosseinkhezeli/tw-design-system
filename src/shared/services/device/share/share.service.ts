class ShareService {
  async share(options: { title?: string; text?: string; url?: string }) {
    if (navigator.share) {
      await navigator.share(options);
      return;
    }

    await navigator.clipboard.writeText(options.url ?? '');
  }
}

export const share = new ShareService();
