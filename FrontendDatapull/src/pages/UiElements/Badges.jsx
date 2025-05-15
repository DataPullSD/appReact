import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Badge from "../../components/ui/badge/Badge";
import { PlusIcon } from "../../icons";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";

export default function Badges() {
  return (
    <div>
      <PageMeta
        title="React.js Badges Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Badges Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Badges" />
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="With Light Background">
          <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
            {/* Light Variant */}
            <Badge variant="light" color="primary">
              Primary
            </Badge>
            <Badge variant="light" color="success">
              Success
            </Badge>{" "}
            <Badge variant="light" color="error">
              Error
            </Badge>{" "}
            <Badge variant="light" color="warning">
              Warning
            </Badge>{" "}
            <Badge variant="light" color="info">
              Info
            </Badge>
            <Badge variant="light" color="light">
              Light
            </Badge>
            <Badge variant="light" color="dark">
              Dark
            </Badge>
          </div>
        </ComponentCard>

        <ComponentCard title="With Solid Background">
          <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
            {/* Solid Variant */}
            <Badge variant="solid" color="primary">
              Primary
            </Badge>
            <Badge variant="solid" color="success">
              Success
            </Badge>{" "}
            <Badge variant="solid" color="error">
              Error
            </Badge>{" "}
            <Badge variant="solid" color="warning">
              Warning
            </Badge>{" "}
            <Badge variant="solid" color="info">
              Info
            </Badge>
            <Badge variant="solid" color="light">
              Light
            </Badge>
            <Badge variant="solid" color="dark">
              Dark
            </Badge>
          </div>
        </ComponentCard>

        <ComponentCard title="With Outline">
          <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
            {/* Outline Variant */}
            <Badge variant="outline" color="primary">
              Primary
            </Badge>
            <Badge variant="outline" color="success">
              Success
            </Badge>{" "}
            <Badge variant="outline" color="error">
              Error
            </Badge>{" "}
            <Badge variant="outline" color="warning">
              Warning
            </Badge>{" "}
            <Badge variant="outline" color="info">
              Info
            </Badge>
            <Badge variant="outline" color="light">
              Light
            </Badge>
            <Badge variant="outline" color="dark">
              Dark
            </Badge>
          </div>
        </ComponentCard>

        <ComponentCard title="With Icon">
          <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
            {/* With Icon */}
            <Badge variant="solid" color="primary" icon={<PlusIcon />}>
              Primary
            </Badge>
            <Badge variant="solid" color="success" icon={<PlusIcon />}>
              Success
            </Badge>{" "}
            <Badge variant="solid" color="error" icon={<PlusIcon />}>
              Error
            </Badge>{" "}
            <Badge variant="solid" color="warning" icon={<PlusIcon />}>
              Warning
            </Badge>{" "}
            <Badge variant="solid" color="info" icon={<PlusIcon />}>
              Info
            </Badge>
            <Badge variant="solid" color="light" icon={<PlusIcon />}>
              Light
            </Badge>
            <Badge variant="solid" color="dark" icon={<PlusIcon />}>
              Dark
            </Badge>
          </div>
        </ComponentCard>

        <ComponentCard title="With Pill Shape">
          <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
            {/* Pill Shape */}
            <Badge variant="solid" color="primary" shape="pill">
              Primary
            </Badge>
            <Badge variant="solid" color="success" shape="pill">
              Success
            </Badge>{" "}
            <Badge variant="solid" color="error" shape="pill">
              Error
            </Badge>{" "}
            <Badge variant="solid" color="warning" shape="pill">
              Warning
            </Badge>{" "}
            <Badge variant="solid" color="info" shape="pill">
              Info
            </Badge>
            <Badge variant="solid" color="light" shape="pill">
              Light
            </Badge>
            <Badge variant="solid" color="dark" shape="pill">
              Dark
            </Badge>
          </div>
        </ComponentCard>
      </div>
    </div>
  );
} 