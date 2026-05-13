import { useQuery } from "@tanstack/react-query";
import { OrganizationsService } from "@/services/OrganizationsService";

export const useOrganizations = () => {
  const { data: organizations, isLoading, isError } = useQuery({
    queryKey: ["organizations"],
    queryFn: OrganizationsService.getOrganizations,
    staleTime: 0,
  });

  return { organizations, isLoading, isError };
};