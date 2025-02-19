import type { AnyPublication, FeedItem } from '@hey/lens';
import type { FC } from 'react';

import ActionType from '@components/Home/Timeline/EventType';
import PublicationWrapper from '@components/Shared/PublicationWrapper';
import { isMirrorPublication } from '@hey/lib/publicationHelpers';
import cn from '@hey/ui/cn';
import pushToImpressions from '@lib/pushToImpressions';
import { memo } from 'react';
import { useInView } from 'react-cool-inview';

import PublicationActions from './Actions';
import FeaturedGroup from './FeaturedGroup';
import HiddenPublication from './HiddenPublication';
import PublicationBody from './PublicationBody';
import PublicationHeader from './PublicationHeader';
import PublicationType from './Type';

interface SinglePublicationProps {
  feedItem?: FeedItem;
  isFirst?: boolean;
  isLast?: boolean;
  publication: AnyPublication;
  showActions?: boolean;
  showMore?: boolean;
  showThread?: boolean;
  showType?: boolean;
}

const SinglePublication: FC<SinglePublicationProps> = ({
  feedItem,
  isFirst = false,
  isLast = false,
  publication,
  showActions = true,
  showMore = true,
  showThread = true,
  showType = true
}) => {
  const rootPublication = feedItem ? feedItem?.root : publication;
  const { metadata } = isMirrorPublication(publication)
    ? publication.mirrorOn
    : publication;

  const { observe } = useInView({
    onChange: ({ inView }) => {
      if (!inView) {
        return;
      }

      pushToImpressions(rootPublication.id);
    }
  });

  return (
    <PublicationWrapper
      className={cn(
        isFirst && 'rounded-t-xl',
        isLast && 'rounded-b-xl',
        'cursor-pointer p-5 hover:bg-gray-100 dark:hover:bg-gray-900'
      )}
      publication={rootPublication}
    >
      <span ref={observe} />
      {feedItem ? (
        <ActionType feedItem={feedItem} />
      ) : (
        <PublicationType
          publication={publication}
          showThread={showThread}
          showType={showType}
        />
      )}
      <PublicationHeader feedItem={feedItem} publication={rootPublication} />
      <div className="ml-[53px]">
        {publication.isHidden ? (
          <HiddenPublication type={publication.__typename} />
        ) : (
          <>
            <PublicationBody
              publication={rootPublication}
              showMore={showMore}
            />
            <div className="flex flex-wrap items-center gap-x-7">
              {showActions ? (
                <PublicationActions publication={rootPublication} />
              ) : null}
              <FeaturedGroup className="mt-3" tags={metadata?.tags} />
            </div>
          </>
        )}
      </div>
    </PublicationWrapper>
  );
};

export default memo(SinglePublication);
