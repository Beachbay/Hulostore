import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
};

type PopupProps = {
  product: Product | null;
  open: boolean;
  onClose: () => void;
};

export default function ProductPopup({ product, open, onClose }: PopupProps) {
  if (!product) {
    return null;
  }

  const addToLocalStorage = () => {
    if (product) {
      // Retrieve the current cart from local storage
      const existingCart = localStorage.getItem("cart");
      const cart = existingCart ? JSON.parse(existingCart) : [];

      // Check if the product with the same ID is in the cart
      const existingProductIndex = cart.findIndex(
        (item: Product) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        // If the product already exists, increment its quantity
        cart[existingProductIndex].quantity += 1;
      } else {
        // If the product doesn't exist, add it to the cart with a quantity of 1
        cart.push({ ...product, quantity: 1 });
      }

      // Store the updated cart in local storage
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                      <img
                        src="/ruslan-bardash-4kTbAMRAHtQ-unsplash.jpg"
                        className="object-cover object-center h-full w-full"
                      />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                        {product.title}
                      </h2>
                      <p className="text-2xl text-gray-900">${product.price}</p>
                      <p className="text-sm text-gray-600 mt-2">
                        {product.description}
                      </p>
                      <button
                        type="button"
                        onClick={addToLocalStorage}
                        className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Add to bag
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
