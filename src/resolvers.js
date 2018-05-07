import gql from 'graphql-tag';

// Sadly can't get this to work without doing a deep dive
export const resolvers = {
  Book: {
    selected: () => false,
  },
  Mutation: {
    toggleBook: (_, { bookId }, { cache, getCacheKey }) => {
      const fragment = gql`
        fragment selected on books {
          selected,
          bookId
        }
      `;
      const fragmentId = getCacheKey({ id: bookId, __typename: 'Book' });
      const book = cache.readFragment({ fragment, bookId: fragmentId });
      cache.writeData({
        id: fragmentId,
        data: {
          ...book,
          selected: !book.selected,
        }
      });
      return null;
    },
  },
};