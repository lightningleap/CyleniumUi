import { createRootRoute,Outlet } from '@tanstack/react-router'

import GeneralError from '@/features/errors/general-error'
import NotFoundError from '@/features/errors/not-found-error'

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
})