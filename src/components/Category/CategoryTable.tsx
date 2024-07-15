import Category from "@/types/category";

interface CategoryTableProps {
  categories: Category[];
}

export default function CategoryTable({ categories }: CategoryTableProps) {
  return (
    <>
      {categories && categories.length > 0 ? (
        <div className="text-gray-950">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-300 text-center">
                  ID
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-center">
                  Name
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-right">
                  Created At
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-right">
                  Updated At
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category._id}>
                  <td className="py-2 px-4 border-b border-gray-300 text-center">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center">
                    {category.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-right">
                    {new Date(category.createdAt).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-right">
                    {new Date(category.updatedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No categories available.</p>
      )}
    </>
  );
}
