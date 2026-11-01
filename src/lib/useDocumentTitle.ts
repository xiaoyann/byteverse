import { useEffect } from 'react';

/** 简单的文档标题管理，避免引入额外依赖 */
export function useDocumentTitle(title: string, description?: string) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    let metaDescription: HTMLMetaElement | null = null;
    let previousDescription = '';
    if (description) {
      metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        previousDescription = metaDescription.content;
        metaDescription.content = description;
      }
    }

    return () => {
      document.title = previousTitle;
      if (metaDescription) metaDescription.content = previousDescription;
    };
  }, [title, description]);
}
