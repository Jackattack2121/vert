import CompanyPageLayout from '@/components/company/CompanyPageLayout'

export const revalidate = 3600 // Revalidate every hour

export default function CorporateResponsibility() {
  return <CompanyPageLayout slug="corporate-responsibility" />
}

