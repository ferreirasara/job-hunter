import { Modal, Typography } from "antd"
import { JobsTableData } from "./JobsTable"
import { isUpperCase } from "../utils/utils"

type DetailsModalProps = {
  open: boolean
  onCancel: () => void
  selectedJob?: JobsTableData
}

export const DetailsModal = ({ onCancel, open, selectedJob }: DetailsModalProps) => {
  const descriptionSplit = selectedJob?.description?.split('\n');
  const description = descriptionSplit?.filter(cur => !!cur);

  return <Modal
    open={open}
    onCancel={onCancel}
    footer={null}
    title={<Typography.Title level={3}>{selectedJob?.title}</Typography.Title>}
  >
    {description?.map(cur => isUpperCase(cur) ? <Typography.Title level={4}>{cur}</Typography.Title> : <Typography.Paragraph>{cur}</Typography.Paragraph>)}
  </Modal>
}