import { trpc } from "@/lib/trpc";

/**
 * Provides the authenticated user for dashboard components and exposes a
 * session-clearing logout action backed by the existing tRPC auth router.
 */
export function useAuth() {
  const utils = trpc.useUtils();
  const { data: user, isLoading: loading } = trpc.auth.me.useQuery(undefined, {
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      utils.auth.me.setData(undefined, null);
    },
  });

  return {
    user,
    loading,
    logout: () => logoutMutation.mutate(),
  };
}
