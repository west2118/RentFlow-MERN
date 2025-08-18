import { Button } from "../ui/button";

type PaginationProps = {
  limit: number;
  page: number;
  total: number | undefined;
  totalPages: number | undefined;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({
  limit,
  page,
  total,
  totalPages,
  setPage,
}: PaginationProps) => {
  if (!totalPages) return null;

  const maxPagesToShow = 5;

  let start = Math.max(1, page - Math.floor(maxPagesToShow / 2));
  let end = start + maxPagesToShow - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxPagesToShow + 1);
  }

  const pageNumbers = [];
  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to{" "}
        <span className="font-medium">
          {Math.min(page * limit, total ?? 0)}
        </span>{" "}
        of <span className="font-medium">{total}</span> units
      </div>
      <div className="flex space-x-2">
        <Button
          onClick={() => setPage((p: number) => Math.max(1, p - 1))}
          disabled={page === 1}
          variant="outline"
          size="sm">
          Previous
        </Button>

        {pageNumbers.map((num) => (
          <Button
            key={num}
            onClick={() => setPage(num)}
            variant={num === page ? "default" : "outline"}
            size="sm">
            {num}
          </Button>
        ))}

        <Button
          onClick={() => setPage((p) => Math.min(totalPages ?? 0, p + 1))}
          disabled={page === totalPages}
          variant="outline"
          size="sm">
          Next
        </Button>
      </div>
    </>
  );
};

export default Pagination;
