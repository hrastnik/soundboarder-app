import { QueryClient } from "react-query";

export function createQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 60 * 1000,
        structuralSharing: false,

        // Standard Laravel response
        // getNextPageParam(lastPage: any) {
        //   if (lastPage?.links?.next) {
        //     return lastPage.meta.current_page + 1;
        //   }
        //   return null;
        // },

        getNextPageParam(lastPage: any) {
          if (lastPage?.next) {
            return Number(lastPage.next.split("page=").pop());
          }
          return null;
        },

        refetchOnWindowFocus: false,
        retry: false,
        useErrorBoundary: false,
      },
      mutations: {
        useErrorBoundary: false,
      },
    },
  });

  return queryClient;
}
