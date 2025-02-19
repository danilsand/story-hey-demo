import type { FC } from 'react';

import Nft from '@components/Publication/HeyOpenActions/Nft';
import Oembed from '@components/Shared/Oembed';
import { ZERO_PUBLICATION_ID } from '@hey/data/constants';
import getURLs from '@hey/lib/getURLs';
import getNft from '@hey/lib/nft/getNft';
import { usePublicationStore } from 'src/store/non-persisted/publication/usePublicationStore';

const LinkPreviews: FC = () => {
  const publicationContent = usePublicationStore(
    (state) => state.publicationContent
  );

  const urls = getURLs(publicationContent);

  if (!urls.length) {
    return null;
  }

  const nft = getNft(urls);

  if (nft) {
    return (
      <div className="m-5">
        {nft ? (
          <Nft mintLink={nft.mintLink} publicationId={ZERO_PUBLICATION_ID} />
        ) : (
          <Oembed url={urls[0]} />
        )}
      </div>
    );
  }

  return <Oembed className="m-5" url={urls[0]} />;
};

export default LinkPreviews;
