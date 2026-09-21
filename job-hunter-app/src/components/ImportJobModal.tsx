import { Form, Input, Select } from 'antd';
import { PLATFORM_OPTIONS } from '../utils/constants';
import Modal from 'antd/es/modal/Modal';
import { JobPlatform } from '../@types/types';
import { useImportJob } from '../hooks/useImportJob';
import { useCallback, useState } from 'react';

interface ImportJobModalProps {
  open: boolean;
  onClose: () => void;
}

const ImportJobModal = ({ open, onClose }: ImportJobModalProps) => {
  const [platform, setPlatform] = useState<JobPlatform>();
  const [url, setUrl] = useState<string>('');

  const { mutateAsync, isPending } = useImportJob();
  const handleRunScrapers = useCallback(async () => {
    if (!platform || !url) {
      return;
    }

    await mutateAsync({ platform, url });
    onClose();
  }, [mutateAsync, platform, url, onClose]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="Importar Vaga"
      onOk={handleRunScrapers}
      okText="Importar"
      okButtonProps={{
        disabled: !platform || !url,
        loading: isPending
      }}
    >
      <Form>
        <Form.Item label="Plataforma" name="platform">
          <Select
            allowClear
            showSearch
            options={PLATFORM_OPTIONS?.map((cur) => ({
              label: cur,
              value: cur,
            }))}
            value={platform}
            onChange={(value) => setPlatform(value)}
          />
        </Form.Item>
        <Form.Item label="URL da Vaga" name="url">
          <Input value={url} onChange={(e) => setUrl(e.target.value)} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ImportJobModal;
