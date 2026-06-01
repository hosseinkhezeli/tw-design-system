type ProfilePageProps = {
  params: Promise<{
    'user-id': string;
  }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { 'user-id': userId } = await params;

  return <div>User ID: {userId}</div>;
}
