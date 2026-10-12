import { useQuery } from "@tanstack/react-query";
import { fetchPublicTours } from "@/lib/tours";

export const publicToursKey = ["public-tours"] as const;

export const useTours = () =>
  useQuery({
    queryKey: publicToursKey,
    queryFn: fetchPublicTours,
    staleTime: 5 * 60 * 1000,
  });

export const useTour = (id: string | undefined) => {
  const query = useTours();
  return {
    ...query,
    tour: query.data?.find((t) => t.id === id),
  };
};
