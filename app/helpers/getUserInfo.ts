import { queryBuilder } from 'lib/planetscale';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';

const getUserInfo = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  const roles = await queryBuilder
    .selectFrom('User')
    .select(['role'])
    .where('email', '=', session?.user?.email || '')
    .execute();

  return {
    ...session,
    user: { ...session?.user, role: roles?.[0]?.role }
  };
};

export default getUserInfo;
