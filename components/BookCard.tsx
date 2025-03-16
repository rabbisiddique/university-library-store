import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import BookCover from "./BookCover";
import { Button } from "./ui/button";

const BookCard = ({
  id,
  title,
  genre,
  color,
  cover,
  isLoanedBook = false,
}: Book) => {
  return (
    <li className={cn(isLoanedBook && "sm:w-52 w-full")}>
      <Link
        href={`/books/${id}`}
        className={cn("flex flex-col", isLoanedBook && "w-full items-center")}
      >
        <BookCover
          coverColor={color}
          coverImage={cover || "https://placehold.co/400x600.png"}
        />

        <div
          className={cn(
            "mt-4",
            !isLoanedBook ? "max-w-28 sm:max-w-[120px]" : "w-full"
          )}
        >
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>

        {isLoanedBook && (
          <div className="mt-3 w-full">
            <div className="book-loaned">
              <Image
                src="/icons/calendar.svg"
                alt="Calendar"
                width={18}
                height={18}
                className="object-contain"
              />
              <p className="text-light-100">11 days left to return</p>
            </div>
            <Button className="bg-dark-600 mt-3 min-h-14 w-full font-bebas-neue text-base text-primary hover:bg-dark-600">
              Download receipt
            </Button>
          </div>
        )}
      </Link>
    </li>
  );
};

export default BookCard;
