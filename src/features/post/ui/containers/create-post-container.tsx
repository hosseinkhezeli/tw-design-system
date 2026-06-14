'use client';
import { CREATE_POST_STEPS } from '../../constants/post.constants';
import { useCreatePostFlow } from '../../hooks/use-create-post-flow';
import { MediaPickerSheet } from '../components/media-picker-sheet';
import { SourceSelectionSheet } from '../components/source-selection-sheet';
import { MediaPreviewForm } from '../forms/media-preview-form';
import { PostDetailsForm } from '../forms/post-details-form';

// فایل CreatePostFlowManager.tsx بسیار تمیزتر می‌شود:
export const CreatePostContainer = () => {
  const {
    isOpen,
    currentStep,
    selectedMedia,
    isPublishing,
    handleClose,
    handleStepBack,
    handleSourceSelected,
    handlePreviewConfirmed,
    handlePublish,
    handleSelectSource,
  } = useCreatePostFlow();
  const isSourceSelectionSheetOpen =
    isOpen && currentStep === CREATE_POST_STEPS.SOURCE_SELECTION;
  const isMediaPickerSheetOpen =
    isOpen && currentStep === CREATE_POST_STEPS.CONTENT;
  return (
    <div className=''>
      <SourceSelectionSheet
        onClose={handleClose}
        isOpen={isSourceSelectionSheetOpen}
        onSourceSelect={handleSelectSource}
      />

      <MediaPickerSheet
        isOpen={isMediaPickerSheetOpen}
        isPending={false}
        onSubmit={handleSourceSelected}
        onClose={handleClose}
      />

      {/* {currentStep === CREATE_POST_STEPS.PREVIEW && selectedMedia && (
        <MediaPreviewForm
          media={selectedMedia}
          onRetake={handleStepBack}
          onConfirm={handlePreviewConfirmed}
        />
      )}

      {currentStep === CREATE_POST_STEPS.DETAILS && selectedMedia && (
        <PostDetailsForm
          mediaPreviewUrl={selectedMedia.previewUrl}
          onSubmit={handlePublish}
          isPending={isPublishing}
        />
      )} */}
    </div>
  );
};
