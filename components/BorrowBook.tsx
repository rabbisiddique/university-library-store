"use client";
import { borrowBook } from "@/lib/book";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
interface Props {
  userId: string;
  bookId: string;
  borrowingEligiblity: {
    isEligible: boolean;
    message: string;
  };
}
const BorrowBook = ({
  userId,
  bookId,
  borrowingEligiblity: { isEligible, message },
}: Props) => {
  const [borrowing, setBorrowing] = useState(false);
  const router = useRouter();
  const handleBorrow = async () => {
    if (!isEligible) {
      toast("Error", {
        description: message,
      });
    }
    setBorrowing(true);
    try {
      const result = await borrowBook({ bookId, userId });
      if (result.success) {
        toast("Success", {
          description: "Book borrowed successfully",
        });
        router.push("/my-profile");
      } else {
        toast("Error", {
          description: result.error,
        });
      }
    } catch (error) {
      toast("Error", {
        description: "An error occurred while borrowing the book",
      });
    } finally {
      setBorrowing(false);
    }
  };
  return (
    <div>
      <Button
        className="book-overview_btn"
        onClick={handleBorrow}
        disabled={borrowing}
      >
        <Image src="/icons/book.svg" alt="book.svg" width={20} height={20} />
        <p className="font-bebas-neue text-xl text-dark-100">
          {borrowing ? "Borrowing..." : "Borrow Book"}
        </p>
      </Button>
    </div>
  );
};

export default BorrowBook;
