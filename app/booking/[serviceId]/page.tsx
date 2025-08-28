// app/booking/[serviceId]/page.tsx its a must because these is the redirect without these if you cick on anay book it woud return errro 404
import { redirect } from 'next/navigation'

interface BookingRedirectProps {
  params: {
    serviceId: string
  }
}

export default function BookingRedirect({ params }: BookingRedirectProps) {
  const { serviceId } = params
  
  // Redirect from /booking/[serviceId] to /book/[serviceId]
  redirect(`/book/${serviceId}`)
}