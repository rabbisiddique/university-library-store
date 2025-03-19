import BookForm from "@/components/admin/forms/BookForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const page = () => {
  return (
    <>
      <Button className="back-btn" asChild>
        <Link href="/admin/books">Go Back</Link>
      </Button>
      <section className="w-full max-w-full">
        <BookForm />
      </section>
    </>
  );
};

export default page;
