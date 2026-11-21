import React from 'react';
import Icon from '@ui/components/elements/Icon';
import Title from '@ui/components/elements/Title';
import { useConsumer } from '@website/hooks/consumer';
import { Loader } from '@ui/components/Placeholder';

export const FeedPanel = () => {
  const { isFetching, renderCollection, loadMore } = useConsumer();
  const [ready, setReady] = React.useState(false);

  const NoPosts = () => (
    <div className="flex min-h-64 flex-col items-center justify-center gap-4 text-center">
      <Icon name="fa-rss" color="#ddc1c9" style={{ fontSize: '120px' }} />
      <Title variant="normal">No posts available</Title>
    </div>
  );

  const Placeholder = () => (
    <article className="mb-4 overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="flex h-36 items-center justify-center bg-slate-100">
        <Icon name="fa-image" size="8x" color="#ddd" />
      </div>
      <div className="space-y-3 p-4">
        <Loader height={25} width="30%" />
        <Loader height={25} width="70%" />
      </div>
    </article>
  );

  React.useEffect(() => {
    if (!isFetching) setReady(true);
  }, [isFetching]);

  return (
    <div className="feed-panel col-span-12 md:col-span-6">
      {renderCollection(
        (item) => (
          <article key={item.id} className="mb-4 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            {item.image && (
              <img className="h-40 w-full object-cover" src={item.image} alt={item.title || ''} loading="lazy" />
            )}
            <div className="p-4">
              <h2 className="mb-2 text-xl font-semibold text-slate-900">{item.title}</h2>
              <p className="text-sm text-slate-600">{item.excerpt}</p>
            </div>
            <div className="border-t border-slate-100 px-4 py-3">
              <a className="font-medium text-indigo-600 hover:underline" href={item.url}>Read More</a>
            </div>
          </article>
        ),
        () => <NoPosts />,
        () => <Placeholder />,
        () => <div className="mb-4 p-4 text-center text-slate-500">Loading ...</div>,
        () => ready && (
          <div className="mb-4 p-4 text-center">
            <button
              type="button"
              onClick={loadMore}
              disabled={isFetching}
              className="rounded-full bg-indigo-600 px-5 py-2 text-xs font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {isFetching ? 'Loading ...' : 'View More'}
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default FeedPanel;
