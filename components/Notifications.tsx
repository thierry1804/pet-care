import { useEffect, useState } from 'react'

export default function Notifications({ pets }) {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const newNotifications = pets.flatMap(pet => [
      ...pet.vaccinations
        .filter(v => isUpcoming(v.date))
        .map(v => ({ pet: pet.name, type: 'vaccination', name: v.vaccine, date: v.date })),
      ...pet.treatments
        .filter(t => isUpcoming(t.date))
        .map(t => ({ pet: pet.name, type: 'traitement', name: t.treatment, date: t.date }))
    ])
    setNotifications(newNotifications)
  }, [pets])

  function isUpcoming(dateString) {
    const date = new Date(dateString)
    const now = new Date()
    const twoWeeksFromNow = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)
    return date > now && date <= twoWeeksFromNow
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">Notifications</h3>
      {notifications.length > 0 ? (
        <ul className="list-disc pl-5">
          {notifications.map((notification, index) => (
            <li key={index} className="mb-2">
              {notification.pet} a un {notification.type} ({notification.name}) prévu le {new Date(notification.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune notification pour le moment.</p>
      )}
    </div>
  )
}

