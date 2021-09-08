type Order = 'desc' | 'asc' | 'ASC' | 'DESC' | undefined;

export class ToursFindAllDto {
  sortBy: string;
  order: Order;
  categoryId?: number;
}
